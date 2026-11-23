import sqlite3

def migrate(db_path):
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()

    # 1. Add columns to users table if not existing
    cursor.execute("PRAGMA table_info(users)")
    cols = [info[1] for info in cursor.fetchall()]

    if "age" not in cols:
        cursor.execute("ALTER TABLE users ADD COLUMN age INTEGER DEFAULT 24")
        print(f"[{db_path}] Added age column to users")

    if "phone" not in cols:
        cursor.execute("ALTER TABLE users ADD COLUMN phone TEXT DEFAULT '7013370889'")
        print(f"[{db_path}] Added phone column to users")

    if "dob" not in cols:
        cursor.execute("ALTER TABLE users ADD COLUMN dob TEXT DEFAULT 'Aug 25'")
        print(f"[{db_path}] Added dob column to users")

    # 2. Create admin_messages table if not exists
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS admin_messages (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        sender_name TEXT DEFAULT 'Ramya Deepika Kudelli (Admin)',
        receiver_id INTEGER,
        receiver_name TEXT DEFAULT 'All Designers',
        subject TEXT NOT NULL,
        content TEXT NOT NULL,
        priority TEXT DEFAULT 'Directive',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
    """)

    # 3. Ensure master admin user Ramya Deepika Kudelli exists
    cursor.execute("SELECT id FROM users WHERE email = 'ramyadeepikakudelli@gmail.com'")
    row = cursor.fetchone()
    if row:
        cursor.execute("""
        UPDATE users SET full_name = 'Ramya Deepika Kudelli', role = 'Admin', age = 24, phone = '7013370889', dob = 'Aug 25' WHERE id = ?
        """, (row[0],))
    else:
        cursor.execute("SELECT id FROM users WHERE role = 'Admin' OR email = 'admin@launchai.com' OR id = 1")
        existing_admin = cursor.fetchone()
        if existing_admin:
            cursor.execute("""
            UPDATE users SET full_name = 'Ramya Deepika Kudelli', email = 'ramyadeepikakudelli@gmail.com', role = 'Admin', age = 24, phone = '7013370889', dob = 'Aug 25' WHERE id = ?
            """, (existing_admin[0],))
        else:
            cursor.execute("""
            INSERT INTO users (org_id, full_name, email, hashed_password, role, age, phone, dob)
            VALUES (1, 'Ramya Deepika Kudelli', 'ramyadeepikakudelli@gmail.com', 'admin_hash_123', 'Admin', 24, '7013370889', 'Aug 25')
            """)

    # Update admin_messages sender_name
    cursor.execute("UPDATE admin_messages SET sender_name = 'Ramya Deepika Kudelli (Admin)'")

    conn.commit()
    print(f"[{db_path}] Master Admin Ramya Deepika Kudelli configured!")
    conn.close()

if __name__ == "__main__":
    import os
    p1 = r"C:\Users\RAMYA KUDELLI\.gemini\antigravity\scratch\LAUNCH_AI\backend\storage\launch_ai.db"
    p2 = r"C:\Users\RAMYA KUDELLI\.gemini\antigravity\scratch\LAUNCH_AI\storage\launch_ai.db"
    p3 = r"C:\Users\RAMYA KUDELLI\OneDrive\Documents\GEN AI\LAUNCH_AI\backend\storage\launch_ai.db"
    p4 = r"C:\Users\RAMYA KUDELLI\OneDrive\Documents\GEN AI\LAUNCH_AI\storage\launch_ai.db"
    for p in [p1, p2, p3, p4]:
        if os.path.exists(p):
            migrate(p)
