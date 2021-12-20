import dva from 'dva';
import router from '@/router'
// 1. Initialize
const app = dva();

// 2. Plugins
// app.use({});

// 3. Model
const requireModel = require.context("./models/", false, /\.ts$/)
requireModel.keys().forEach(filename => {
    app.model(requireModel(filename).default)
})

// 4. Router
app.router(router);

// 5. Start
app.start('#root');
