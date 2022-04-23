import { setupApp } from '@/server/config/app';
import dotenv from 'dotenv';

dotenv.config();

const app = setupApp();
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`✅ Server started on port ${PORT}`);
});
