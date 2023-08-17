timestamp=$(shell date +"%Y%m%d%H%M%S")

build:
	yarn install
	yarn build

docker:
	docker build -f script/Dockerfile -t hamstershare/nft-activity:$(timestamp)  .
