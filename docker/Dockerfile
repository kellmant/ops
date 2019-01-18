FROM alpine:latest
MAINTAINER kellman
USER root
COPY bin /usr/local/bin
RUN apk -Uuvv add --no-cache curl git bash openssl tini tzdata ca-certificates && \
    addgroup -g 500 core && \
    adduser -D ctrl -u 500 -g controller -G core -s /bin/bash -h /ctrl && \
    adduser -S -u 904 -G core -H node && \
    git clone https://github.com/kellmant/devnode.git /ctrl && \
    mv -f /usr/local/bin/vimrc /ctrl/.vimrc && chown -R ctrl.core /ctrl && \
    mkdir -p /socket && chown -R ctrl.core /socket && \
    mkdir -p /web && chown -R ctrl.core /web && \
    mkdir -p /node && chown -R ctrl.core /node && \
    mkdir -p /ca && chown -R ctrl.core /ca && \
    update-ca-certificates && \
    mkdir -p /tmp/build && cd /tmp/build && \
    curl -L https://github.com/coreos/etcd/releases/download/v3.1.8/etcd-v3.1.8-linux-amd64.tar.gz -o etcd-v3.1.8-linux-amd64.tar.gz && \
    tar xzvf etcd-v3.1.8-linux-amd64.tar.gz && cd etcd-v3.1.8-linux-amd64 && \
    cp ./etcdctl /usr/bin/ && cd /tmp/build && \
    curl -L https://github.com/coreos/fleet/releases/download/v0.11.8/fleet-v0.11.8-linux-amd64.tar.gz -o fleet.tar.gz && \
    tar xzvf fleet.tar.gz && cd fleet-v0.11.8-linux-amd64 && \
    cp ./fleetctl /usr/bin/ && \
    cd / && rm -rf /tmp/build
RUN mkdir -p /node && chown -R ctrl /node && \
    echo -n "Gateway In The Sky Project " > /etc/motd && \
    echo -n "Securing Labs Ninja Dev Shell [Alpine:latest] " >> /etc/motd && \
    echo "overlaynetwork[TRUSTED] " >> /etc/motd && \
    echo " " >> /etc/motd && \
    echo "NodeJS Tools you can install with npm :" >> /etc/motd && \
    echo "Learn Node: https://www.npmjs.com/package/learnyounode " >> /etc/motd && \
    echo "PUML Diagrams: https://www.npmjs.com/package/node-plantuml " >> /etc/motd && \
    echo " " >> /etc/motd && \
    apk -Uuvv add --no-cache \
    python py-pip zip util-linux coreutils findutils grep \
    jq tree groff less build-base linux-headers fontconfig openssl-dev \ 
    bc vim dialog ncurses ncurses-libs ncurses-terminfo libevent tmux openssh binutils xdg-utils \
    rsync musl musl-dev go nodejs-npm nodejs-dev nodejs graphviz ttf-droid \ 
    ttf-droid-nonlatin openjdk8-jre && \
    pip install --upgrade pip && \
    pip install powerline-status && \
    rm -rf /root/.cache && \
    rm -rf /tmp/* && \
    rm -rf /var/cache/apk/*
USER ctrl
ENV NPM_CONFIG_PREFIX=/node
RUN npm config set package-lock false && \
    npm install -g npm && \
    npm update -g && \
    npm install -g generate-schema && \
    npm install -g yoda-said 
WORKDIR /ctrl
RUN npm install && \
    mkdir -p .vim/autoload && \
    mkdir -p .vim/bundle && \
    curl -o .vim/autoload/pathogen.vim -L https://raw.githubusercontent.com/tpope/vim-pathogen/master/autoload/pathogen.vim && \
    cd .vim/bundle && \
    git clone https://github.com/plasticboy/vim-markdown && \
    git clone https://github.com/pangloss/vim-javascript && \
    git clone https://github.com/klen/python-mode && \
    git clone https://github.com/ekalinin/dockerfile.vim && \
    git clone https://github.com/othree/html5.vim && \
    git clone https://github.com/elzr/vim-json && \
    git clone git://github.com/altercation/vim-colors-solarized.git && \
    cd /ctrl
CMD ["/bin/bash", "-l"]
