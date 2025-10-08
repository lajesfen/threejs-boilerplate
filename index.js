import express from 'express';
import path from 'path';

const app = express();
const port = 8000;

app.use('/node_modules', express.static(path.join(import.meta.dir, 'node_modules')));
app.use(express.static(path.join(import.meta.dir, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(import.meta.dir, 'public', 'index.html'));
});

app.listen(port, () => {
    console.log(`Ready @ http://localhost:${port}`);
});
