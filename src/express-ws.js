import express from 'express';
import ws from 'express-ws';

const expressWs = ws(express());

export default expressWs
