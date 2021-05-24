#export NODE_ENV
#export DB_HOST
#export DB_PORT
#export DB_NAME
#export DB_SCHEMA
#export DB_PWD
#export DB_USER
#export ENABLE_SSL
#export JWT_TOKEN_SECRET

export NODE_ENV=development
export DB_HOST=sql.gcchqims.in
export DB_PORT=7001
export DB_NAME=last_respects
export DB_SCHEMA=last_respects_dev
export DB_PWD="n!w2<+wNYK"
export DB_USER=rpt_isolation_dev_rw
export ENABLE_SSL=false
export JWT_TOKEN_SECRET=secret
npm run build
npm run serve