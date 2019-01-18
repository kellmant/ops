FROM alpine:latest
MAINTAINER kellman
USER root
RUN apk -Uuvv add --no-cache curl tini tzdata bash vim jq \
	build-base linux-headers && \
	rm -rf /root/.cache && \
	rm -rf /tmp/* && \
	rm -rf /var/cache/apk/*
RUN addgroup -g 1003 core && \
	adduser -D ctrl -u 501 -g controller -G core -s /bin/bash -h /ctrl && \
   	mkdir -p /ctrl && chown -R ctrl.core /ctrl && \
	mkdir -p /node && chown -R ctrl.core /node && \
	apk -Uuvv add --no-cache python nodejs-npm nodejs && \
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
