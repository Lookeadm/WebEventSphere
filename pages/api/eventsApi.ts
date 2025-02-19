export default async function handler(req: any, res: any) {
    try {
        const response = await fetch('https://gamesphereapi.onrender.com/events/all');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {

    }
    if (req.method === 'POST') {
        const { body } = req;
        const response = await fetch('https://gamesphereapi.onrender.com/events/add',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body)
            }
        );

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        res.status(200).json({ message: 'Data received', data: body });
    }
    if (req.method === 'PUT') {
        const { body } = req;
        const response = await fetch('https://gamesphereapi.onrender.com/events/edit',
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body)
            }
        );

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        res.status(200).json({ message: 'Data received', data: body });
    }
}
