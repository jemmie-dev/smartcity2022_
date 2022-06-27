const express = require('express');
const app = express();

const { proxy, scriptUrl } = require('rtsp-relay')(app);

var handler = "";

// the endpoint our RTSP uses

// this is an example html page to view the stream
app.get('/:ipcamera', (req, res) => {
  console.log(req.params.ipcamera);

  var ipcamera = req.params.ipcamera;

  handler = proxy({
  url: `rtsp://admin:kcp772233@118.172.206.162:11554/Streaming/Channels/${ipcamera}`,
  // if your RTSP stream need credentials, include them in the URL as above
  verbose: false,
  transport: 'tcp',
    additionalFlags: ['-q', '1']
  
  });

app.ws(`/api/${ipcamera}`, handler);
  res.send(`
  <canvas id='canvas' width='500' height='500' style='border: 1px solid #ccc'></canvas>
  <script src='${scriptUrl}'></script>
  <script>
    loadPlayer({
      url: 'ws://'+location.host+'/api/${ipcamera}',
      canvas: document.getElementById('canvas')
    });
  </script>
`)
}
  
);

app.listen(3000);