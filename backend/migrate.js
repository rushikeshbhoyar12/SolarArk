import http from 'http';

const migrate = async () => {
    const options = {
        hostname: 'localhost',
        port: 5900,
        path: '/api/admin/migrate',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': 0
        }
    };

    const req = http.request(options, (res) => {
        let data = '';
        res.on('data', (chunk) => {
            data += chunk;
        });
        res.on('end', () => {
            console.log('✅ Migration successful!');
            try {
                console.log(JSON.stringify(JSON.parse(data), null, 2));
            } catch {
                console.log(data);
            }
        });
    });

    req.on('error', (error) => {
        console.error('❌ Migration failed:', error.message);
    });

    req.end();
};

migrate();
