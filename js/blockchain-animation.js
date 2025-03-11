/*=========== Blockchain Background Animation ==========*/
document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('blockchain-canvas');
    const ctx = canvas.getContext('2d');

    // Set canvas size to match window
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Resize canvas on window resize
    window.addEventListener('resize', function() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    // Blockchain node class
    class Node {
        constructor(x, y, radius) {
            this.x = x;
            this.y = y;
            this.radius = radius;
            this.color = '#00f7ff';
            this.shadowBlur = 15;
            this.shadowColor = 'rgba(0, 247, 255, 0.5)';
            this.connections = [];
            this.speed = {
                x: (Math.random() - 0.5) * 0.5,
                y: (Math.random() - 0.5) * 0.5
            };
            this.pulseSize = 0;
            this.pulseSpeed = Math.random() * 0.02 + 0.01;
            this.maxPulse = this.radius * 0.3;
        }

        // Draw node
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius + this.pulseSize, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.shadowBlur = this.shadowBlur;
            ctx.shadowColor = this.shadowColor;
            ctx.fill();
            ctx.shadowBlur = 0;
            ctx.closePath();
        }

        // Update node position and pulse
        update() {
            // Update position
            this.x += this.speed.x;
            this.y += this.speed.y;

            // Bounce off edges
            if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
                this.speed.x = -this.speed.x;
            }
            if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
                this.speed.y = -this.speed.y;
            }

            // Update pulse
            this.pulseSize += this.pulseSpeed;
            if (this.pulseSize > this.maxPulse || this.pulseSize < 0) {
                this.pulseSpeed = -this.pulseSpeed;
            }

            // Draw connections
            this.connections.forEach(node => {
                drawConnection(this, node);
            });

            // Draw self
            this.draw();
        }
    }

    // Draw connection between nodes
    function drawConnection(node1, node2) {
        const dx = node2.x - node1.x;
        const dy = node2.y - node1.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // Calculate opacity based on distance
        const maxDistance = 300;
        let opacity = 1 - distance / maxDistance;
        if (opacity < 0) opacity = 0;
        
        // Draw line
        ctx.beginPath();
        ctx.moveTo(node1.x, node1.y);
        ctx.lineTo(node2.x, node2.y);
        ctx.strokeStyle = `rgba(0, 247, 255, ${opacity * 0.5})`;
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.closePath();
    }

    // Add blockchain data visualization
    class DataPacket {
        constructor(startNode, endNode) {
            this.startNode = startNode;
            this.endNode = endNode;
            this.x = startNode.x;
            this.y = startNode.y;
            this.size = 3;
            this.progress = 0;
            this.speed = 0.01 + Math.random() * 0.01;
            this.color = `rgba(${Math.floor(Math.random() * 100) + 155}, 247, 255, 0.8)`;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.shadowBlur = 10;
            ctx.shadowColor = this.color;
            ctx.fill();
            ctx.shadowBlur = 0;
            ctx.closePath();
        }

        update() {
            this.progress += this.speed;
            if (this.progress > 1) {
                return true; // Completed
            }

            // Calculate position along the path
            this.x = this.startNode.x + (this.endNode.x - this.startNode.x) * this.progress;
            this.y = this.startNode.y + (this.endNode.y - this.startNode.y) * this.progress;
            
            this.draw();
            return false;
        }
    }

    // Create nodes
    let nodes = [];
    const nodeCount = Math.floor(window.innerWidth * window.innerHeight / 50000); // Adjust density based on screen size
    const minDistance = 200; // Minimum distance for creating connections

    for (let i = 0; i < nodeCount; i++) {
        const radius = Math.random() * 2 + 1;
        const x = Math.random() * (canvas.width - radius * 2) + radius;
        const y = Math.random() * (canvas.height - radius * 2) + radius;
        nodes.push(new Node(x, y, radius));
    }

    // Create connections
    nodes.forEach(node => {
        nodes.forEach(otherNode => {
            if (node !== otherNode) {
                const dx = otherNode.x - node.x;
                const dy = otherNode.y - node.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < minDistance) {
                    node.connections.push(otherNode);
                }
            }
        });
    });

    // Data packets
    let dataPackets = [];
    
    // Create new data packet periodically
    setInterval(() => {
        if (nodes.length > 1) {
            const startNode = nodes[Math.floor(Math.random() * nodes.length)];
            let endNode;
            
            // Find a connected node
            if (startNode.connections.length > 0) {
                endNode = startNode.connections[Math.floor(Math.random() * startNode.connections.length)];
            } else {
                // If no connections, use any other node
                do {
                    endNode = nodes[Math.floor(Math.random() * nodes.length)];
                } while (endNode === startNode);
            }
            
            dataPackets.push(new DataPacket(startNode, endNode));
        }
    }, 500);

    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw background gradient
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        gradient.addColorStop(0, 'rgba(7, 11, 23, 0.8)');
        gradient.addColorStop(1, 'rgba(10, 14, 26, 0.8)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Update nodes
        nodes.forEach(node => {
            node.update();
        });

        // Update data packets
        dataPackets = dataPackets.filter(packet => !packet.update());
    }

    // Start animation
    animate();
}); 