sync-type: 
	bash scripts/copy_typings.sh
	
frontend:
	cd frontend;\
	yarn build
backend:
	cd backend;\
	yarn build

backend-docker: backend
	cd backend;
	yarn build 
