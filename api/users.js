export default function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const users = JSON.parse(process.env.USERS_DATA);
    
    // Filter users who have a non-empty token
    const usersWithTokens = users.filter(user => user.token && user.token.trim() !== '');
    
    // Return only the info needed for the menu (no passwords or tokens)
    const safeUsers = usersWithTokens.map(user => ({
      id: user.id,
      name: user.name
    }));
    
    res.status(200).json({ users: safeUsers });
    
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
}
