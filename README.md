## groups.yp.com

Internal Google Groups website for YP.com
(My Recent Hackathon project)

![groups](http://i.imgur.com/RyhDmVe.png)

### Install Node

#### Debian / Ubuntu

    cd /tmp
    git clone https://github.com/joyent/node.git
    cd node
    git checkout v0.10.4-release
    ./configure
    make
    make install

### Mac

Get the pkg file from http://nodejs.org

### Run

    node server.js

### Development

    npm install -g grunt-cli
    npm install
    grunt watch (compile .styl files into css)

### Test

    npm test
    
or 
    
    node test/test-file.js

### Deploy

bin/deploy prod

### Servers

groups.np.wc1.yellowpages.com

vip - dev-groups.v.wc1.atti.com

### Install LevelDB on CentOS 5.8
https://github.com/rvagg/node-leveldown/issues/33

ssh as nextgen

  cd ~/
  git clone git://github.com/rvagg/node-levelup.git
  git clone git://github.com/rvagg/node-leveldown.git
  cd node-leveldown

edit the .gyp file to make it work edit leveldown/deps/leveldb/leveldb.gyp remove the following: '-Wno-sign-compare' , '-Wno-unused-but-set-variable'

  npm install 

if it doesn't do a compile then run `node-gyp rebuild`

login as user with sudo

    sudo npm link       # link this in the global node modules directory
    cd ../node-levelup
    npm link leveldown  # make a symlink to your leveldown dir
    npm install
    sudo npm link

login as nextgen

    cd ~/groups
    npm link levelup
