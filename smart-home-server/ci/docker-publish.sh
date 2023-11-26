#!/bin/sh
echo "CI_COMMIT_REF_NAME=" $CI_COMMIT_REF_NAME
echo "CI_PIPELINE_IID=" $CI_PIPELINE_IID
echo "CI_COMMIT_SHORT_SHA=" $CI_COMMIT_SHORT_SHA
echo "PRODUCT_VERSION=" $PRODUCT_VERSION

DOCKER_TAG=''
LATEST_TAG=''
CONTAINER_NAME=''
CONTAINER_NAME_LATEST=''
VERSION="$PRODUCT_VERSION"."$CI_PIPELINE_IID"-"$CI_COMMIT_SHORT_SHA"
EXT_REPO=715177644330.dkr.ecr.eu-central-1.amazonaws.com/lorgar-admin

case "$CI_COMMIT_REF_NAME" in
  "master")
    DOCKER_TAG=$VERSION
    LATEST_TAG=latest
    ;;
  "dev-ci")
    DOCKER_TAG=$VERSION
    LATEST_TAG=latest
    ;;
  "dev")
    DOCKER_TAG=dev_"$VERSION"
    LATEST_TAG=dev_latest
    ;;
  "stage")
    DOCKER_TAG=stage_"$VERSION"
    LATEST_TAG=stage_latest
    ;;
  "prod_4")
    DOCKER_TAG=prod_4_"$VERSION"
    LATEST_TAG=prod_4_latest
    ;;
  "prod")
    DOCKER_TAG=prod_"$VERSION"
    LATEST_TAG=prod_latest
    ;;
  "test")
    DOCKER_TAG=test_"$VERSION"
    LATEST_TAG=test_latest
    ;;
  *)
    DOCKER_TAG="$CI_COMMIT_REF_NAME"_"$VERSION"
    LATEST_TAG="$CI_COMMIT_REF_NAME"_build_latest
    ;;
esac

case "$CI_COMMIT_REF_NAME" in
  "prod")
  CONTAINER_NAME=$EXT_REPO:prod_$CI_PIPELINE_IID
  echo $CONTAINER_NAME
  docker build -t $CONTAINER_NAME -f Dockerfile --build-arg VERSION=$VERSION .
  docker push $CONTAINER_NAME
    ;;
  "uat")
  CONTAINER_NAME=$EXT_REPO:uat_$CI_PIPELINE_IID
  echo $CONTAINER_NAME
  docker build -t $CONTAINER_NAME -f Dockerfile --build-arg VERSION=$VERSION .
  docker push $CONTAINER_NAME
      ;;
  *)
  CONTAINER_NAME=${CI_REGISTRY}/${CI_PROJECT_PATH}/"$SERVICE_PREFIX"_"$SERVICE_NAME":$DOCKER_TAG
  CONTAINER_NAME_LATEST=${CI_REGISTRY}/${CI_PROJECT_PATH}/"$SERVICE_PREFIX"_"$SERVICE_NAME":$LATEST_TAG
  echo $CONTAINER_NAME
  docker build -t $CONTAINER_NAME_LATEST -f Dockerfile --build-arg VERSION=$VERSION .
  docker push $CONTAINER_NAME_LATEST
    ;;
esac


#docker tag $CONTAINER_NAME_LATEST $CONTAINER_NAME
#docker push $CONTAINER_NAME
