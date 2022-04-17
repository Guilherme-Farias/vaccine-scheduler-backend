import { setupApp } from '@/server/config/app';

const app = setupApp();
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`✅ Server started on port ${PORT}`);
});
