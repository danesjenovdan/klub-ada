#!/bin/bash

sudo docker login rg.fr-par.scw.cloud/djnd -u nologin -p $SCW_SECRET_TOKEN

sudo docker build -f Dockerfile -t klub-ada:latest .
sudo docker tag klub-ada:latest rg.fr-par.scw.cloud/djnd/klub-ada:latest
sudo docker push rg.fr-par.scw.cloud/djnd/klub-ada:latest