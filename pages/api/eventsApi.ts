export default async function handler(req: any, res: any) {
    try {
        if (req.method === 'GET') {
            const { id } = req.query; // Lấy ID từ query
            if (id) {
                const response = await fetch(`https://gamesphereapi.onrender.com/events/${id}`); // Gọi API để lấy sự kiện theo ID
                if (!response.ok) {
                    // Nếu phản hồi không ok, trả về lỗi 404
                    return res.status(404).json({ message: 'Không tìm thấy sự kiện với ID này' });
                }
                const data = await response.json();
                res.status(200).json(data);
                return; // Kết thúc hàm sau khi trả về dữ liệu
            } else {
                const response = await fetch('https://gamesphereapi.onrender.com/events/all');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                res.status(200).json(data);
            }
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
    } catch (error: any) {
        res.status(500).json({ message: error.message }); // Trả về lỗi nếu có
    }
}
