timestamp=202308231404

docker:
	git fetch origin
	git merge origin/master
	docker build -f script/Dockerfile -t hamstershare/nft-activity:$(timestamp)  .
	docker push hamstershare/nft-activity:$(timestamp)

docker-only:
	docker build -f script/Dockerfile -t hamstershare/nft-activity:$(timestamp)  .

deploy-test: docker
	kubectl --kubeconfig $(HOME)/.kube/config_test -n hamster set image deployment/nft-activity nft-activity=hamstershare/nft-activity:$(timestamp)
