import os
from datetime import datetime


def get_timestamp_path(instance, filename):
	# 'files/%Y/%m/%d/'
	fn = 'files/%Y/%m/%d/' + '%s / %s' % (datetime.now().timestamp(),
	               os.path.splitext(filename)[1])
	return fn