timestamp=$(shell date +"%Y%m%d%H%M%S")

docker:
	git fetch origin
	git merge origin/master
	docker build -f script/Dockerfile -t hamstershare/nft-activity:$(timestamp)  .

deploy-test: docker
	kubectl --kubeconfig $(HOME)/.kube/config_test -n hamster set image deployment/nft-activity nft-activity=hamstershare/nft-activity:$(timestamp)
