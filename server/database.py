from os import listdir
from os.path import isfile, join
video_path = "/server/videos"

onlyfiles = [f for f in listdir(video_path) if isfile(join(video_path, f))]