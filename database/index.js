const initSqlJs = require('sql.js');
const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, '..', 'data.db');

let db;

async function init() {
  const SQL = await initSqlJs();

  if (fs.existsSync(dbPath)) {
    const buffer = fs.readFileSync(dbPath);
    db = new SQL.Database(buffer);
  } else {
    db = new SQL.Database();
  }

  db.run(`
    CREATE TABLE IF NOT EXISTS guilds (
      id TEXT PRIMARY KEY,
      prefix TEXT DEFAULT '!',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT NOT NULL,
      guild_id TEXT NOT NULL,
      join_date DATETIME DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY (id, guild_id)
    )
  `);

  save();
}

function save() {
  const data = db.export();
  const buffer = Buffer.from(data);
  fs.writeFileSync(dbPath, buffer);
}

const guilds = {
  get(guildId) {
    const stmt = db.prepare('SELECT * FROM guilds WHERE id = ?');
    stmt.bind([guildId]);
    if (stmt.step()) {
      return stmt.getAsObject();
    }
    stmt.free();
    return null;
  },
  set(guildId, data) {
    db.run('INSERT OR REPLACE INTO guilds (id, prefix) VALUES (?, ?)', [
      guildId,
      data.prefix || '!',
    ]);
    save();
  },
};

const users = {
  get(userId, guildId) {
    const stmt = db.prepare('SELECT * FROM users WHERE id = ? AND guild_id = ?');
    stmt.bind([userId, guildId]);
    if (stmt.step()) {
      return stmt.getAsObject();
    }
    stmt.free();
    return null;
  },
  register(userId, guildId) {
    db.run('INSERT OR IGNORE INTO users (id, guild_id) VALUES (?, ?)', [userId, guildId]);
    save();
  },
};

module.exports = { init, db, guilds, users };
