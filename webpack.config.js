const path = require('path');
const exec = require('child_process').exec;

const HtmlWebpackPlugin = require('html-webpack-plugin');

function execute(commands) {
  exec(commands.join(';'), (err, stdout, stderr) => {
    if (stdout) process.stdout.write(stdout);
    if (stderr) process.stderr.write(stderr);
  });
}

const REPO_URL = 'https://github.com/hnOsmium0001/DEMO-Webpack.git';

module.exports = env => {
  return {
    entry: './src/index.js',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, './Builds')
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader']
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin(),
      {
        apply: (compiler) => {
          compiler.hooks.afterEmit.tap('AfterEmitPlugin', (compilation) => {
            if (!env) {
              execute(['echo "Environment was not specified. Add --env.commit to commit"']);
              return;
            }

            if (env.commit) {
              execute([`bash ./build.sh ${REPO_URL}`]);
            }
          });
        }
      }
    ]
  };
};