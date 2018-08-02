const config = {}

config.redis_url = 'redis://h:pc18c701245d6fe96c1c0fbed36ebe4fd64e2c0777f16031de438c7ac849b0d6e@ec2-52-206-1-70.compute-1.amazonaws.com:50379'
config.port = 3000

config.current_user_locations = "CurrentUserLocations"
config.redis_listens_namespace = 'listens'

module.exports = config