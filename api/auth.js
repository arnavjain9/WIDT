export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { password } = req.body;
  
  try {
    const users = JSON.parse(process.env.USERS_DATA);
    const user = users.find(u => u.password === password);
    
    if (user) {
      res.status(200).json({ 
        success: true, 
        userType: user.id,
        userName: user.name
      });
    } else {
      res.status(401).json({ success: false });
    }
  } catch (error) {
    console.error('Error parsing users data:', error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
}
