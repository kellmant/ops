FROM alpine:latest
MAINTAINER kellman
USER root
RUN apk -Uu add --no-cache curl tini tzdata bash vim jq openssl ca-certificates \
	build-base linux-headers zip unrar util-linux coreutils findutils grep \
	bc tree ncurses binutils openssh rsync git graphviz && \
	mkdir -p /tmp/build && cd /tmp/build && \
	curl -L https://github.com/coreos/etcd/releases/download/v3.1.8/etcd-v3.1.8-linux-amd64.tar.gz -o etcd-v3.1.8-linux-amd64.tar.gz && \
	tar xzvf etcd-v3.1.8-linux-amd64.tar.gz && cd etcd-v3.1.8-linux-amd64 && \
	cp ./etcdctl /usr/bin/ && cd / && \
	rm -rf /root/.cache && \
	rm -rf /tmp/* && \
	rm -rf /var/cache/apk/*
COPY ctrl /ctrl
RUN addgroup -g 1003 core && \
	adduser -D ctrl -u 501 -g controller -G core -s /bin/bash -h /ctrl && \
   	mkdir -p /ctrl && chown -R ctrl.core /ctrl && \
	mkdir -p /node && chown -R ctrl.core /node && \
	apk -Uu add --no-cache python py-pip nodejs-npm nodejs && \
	pip install --upgrade pip && \
	pip install awscli && \
	pip install aws-shell && \
	pip install s3cmd && \
	rm -rf /root/.cache && \
	rm -rf /tmp/* && \
	rm -rf /var/cache/apk/*
EXPOSE 4000 5000 5001
VOLUME ["/ctrl"]
USER ctrl
ENV NPM_CONFIG_PREFIX=/node
RUN npm config set package-lock false && \
    npm install -g npm && \
    npm update -g
WORKDIR /ctrl
ENTRYPOINT ["/sbin/tini", "-g", "--"]
CMD ["/bin/bash", "-l"]
