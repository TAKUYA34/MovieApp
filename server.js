// 必要なモジュールを読み込む
const express = require('express');
const multer = require('multer');
const path = require('path');
const cors = require('cors');

// アプリケーションのインスタンスを作成
const app = express();

// CORSを許可する（任意で変更可能）
app.use(cors());

// アップロード先の設定
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// 静的ファイルの提供（アップロードされた動画ファイルを提供）
app.use('/uploads', express.static('uploads'));

// 複数ファイルのアップロードAPI
app.post('/upload-multiple', upload.array('videos', 10), (req, res) => {
  const fileUrls = req.files.map(file => `http://localhost:5001/uploads/${file.filename}`);
  res.json(fileUrls); // 動画のURLリストを返す
});

// GET/をリクエストした際の処理
app.get('/', (req, res) => {
  res.send('Welcome to the server!');
})

// サーバーを起動
const PORT = 5001;
app.listen(PORT, () => {
  console.log(`サーバーが起動しました: http://localhost:${PORT}`);
});