#!/bin/bash

start_or_run () {
    docker inspect billmind_postgres > /dev/null 2>&1

    if [ $? -eq 0 ]; then
        echo "Starting BillMind Postgres container..."
        docker start billmind_postgres
    else
        echo "BillMind Postgres container not found, creating a new one..."
        source "$(dirname "$0")/../../.env"
        docker run -d --name billmind_postgres -p 5432:5432 -e POSTGRES_PASSWORD=$POSTGRES_PASSWORD postgres:17
    fi
}

case "$1" in
    start)
        start_or_run
        ;;
    stop)
        echo "Stopping BillMind Postgres container..."
        docker stop billmind_postgres
        ;;
    logs)
        echo "Fetching logs for BillMind Postgres container..."
        docker logs -f billmind_postgres
        ;;
    *)
        echo "Usage: $0 {start|stop|logs}"
        exit 1
esac
