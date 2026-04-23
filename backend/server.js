import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';
import os from 'os';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

console.log('🚀 Starting SolarARK Project...\n');

// Define all servers
const servers = [
    {
        name: 'Auth Server',
        port: 5000,
        cmd: 'node',
        args: ['authServer.js'],
        cwd: __dirname,
        delay: 0
    },
    {
        name: 'Forms Server',
        port: 5800,
        cmd: 'node',
        args: ['formServer.js'],
        cwd: __dirname,
        delay: 1000
    },
    {
        name: 'Admin Server',
        port: 5900,
        cmd: 'node',
        args: ['adminServer.js'],
        cwd: __dirname,
        delay: 2000
    },
    {
        name: 'Frontend (Vite)',
        port: 5173,
        cmd: os.platform() === 'win32' ? 'npm.cmd' : 'npm',
        args: ['run', 'dev'],
        cwd: path.join(__dirname, '../SolarArk'),
        delay: 3000
    }
];

let startedCount = 0;

// Start all servers with delays
servers.forEach((server) => {
    setTimeout(() => {
        console.log(`✅ Starting ${server.name} (Port: ${server.port})...`);
        const child = spawn(server.cmd, server.args, {
            cwd: server.cwd,
            stdio: 'inherit',
            shell: true
        });

        child.on('error', (err) => {
            console.error(`❌ ${server.name} error:`, err.message);
        });

        child.on('exit', (code) => {
            if (code !== null && code !== 0) {
                console.error(`⚠️ ${server.name} exited with code ${code}`);
            }
        });

        startedCount++;

        // Show startup completion message
        if (startedCount === servers.length) {
            setTimeout(() => {
                console.log('\n========================================');
                console.log('🎉 All SolarARK Servers Started!');
                console.log('========================================\n');
                console.log('📱 Access your application:');
                console.log('   🌐 Website: http://localhost:5173');
                console.log('   🔐 Admin Panel: http://localhost:5173/admin');
                console.log('   📧 See SETUP_GUIDE.md for admin credential setup\n');
                console.log('💻 Backend Servers:');
                console.log('   • Auth Server: http://localhost:5000');
                console.log('   • Forms Server: http://localhost:5800');
                console.log('   • Admin Server: http://localhost:5900\n');
                console.log('⏹️  Press Ctrl+C to stop all servers');
                console.log('========================================\n');
            }, 1000);
        }
    }, server.delay);
});

// Graceful shutdown
process.on('SIGINT', () => {
    console.log('\n\n🛑 Shutting down all servers...');
    process.exit(0);
});
