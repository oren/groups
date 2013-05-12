#!/bin/bash

# This script will setup a host for groups project - http://git.corp.attinteractive.com/dstools/groups
# usage: sudo ./install.sh

install_packages() {
  # project dependencies
  tpkg --install python=2.7.2
}

setup_files() {
  # add .bashrc and .bash_profile
  cat > /usr/local/nextgen/.bashrc << EOF
EOF

  cat > /usr/local/nextgen/.bash_profile << EOF
  source .bashrc
EOF

  # needed for mon and mongroup
  chown -R root:nextgen /usr/local/bin

  # needed by deploy tool
  if [ ! -L "/usr/bin/git" ]; then
    sudo ln -s /home/t/bin/git /usr/bin/git
  fi
  
  # needed for node
  if [ ! -L "/usr/bin/git" ]; then
    ln -s /home/t/bin/python2.7 /home/t/bin/python
  fi
}

install_node() {  
  if test command -v node >/dev/null 2>&1 -eq 0; then
    echo 'node not found'
    _install_node $1
  else
    local version=`node -v`

    if test $NODE_VER = $1; then
      echo "node $1 already installed"
    else
      echo "node $version already installed"
      _install_node $1
    fi
  fi
}

_install_node() {  
  local NODE_VER=$1
  echo "installing node $NODE_VER"
  cd /tmp
  if [ -d "node" ]; then
    rm -r node
  fi
  git clone https://github.com/joyent/node.git
  cd node
  git checkout $NODE_VER
  ./configure
  make
  make install
}

install_mon() {
  if [ ! -d "/tmp/mon" ]; then
    (mkdir /tmp/mon && cd /tmp/mon && curl -L# https://github.com/visionmedia/mon/archive/master.tar.gz | tar zx --strip 1 && make install)
  fi
}

install_mongroup() {
  if [ ! -d "/tmp/mongroup" ]; then
    (mkdir /tmp/mongroup && cd /tmp/mongroup && curl -L# https://github.com/visionmedia/mongroup/archive/master.tar.gz | tar zx --strip 1 && make install)
  fi
}

install_packages
setup_files
install_node v0.10.4-release
install_mon
install_mongroup
