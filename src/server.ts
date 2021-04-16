import app from './app';
import 'dotenv/config';

const PORT = process.env.PORT || 7000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
