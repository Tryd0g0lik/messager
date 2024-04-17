import hashlib
import os
from datetime import datetime


from project.settings import MEDIA_ROOT

'''Note: This var is esed in more when one code/file'''
extension = ('git', 'png', 'jpg', 'jpeg', 'doc', 'pdf', 'xls', 'xls', 'xlsx',
			                    'doc', 'docx', 'ods', 'odt')

def get_timestamp_path(instance, filename):
	# 'files/%Y/%m/%d/'
	fn = 'files/%Y/%m/%d/' + '%s / %s' % (datetime.now().timestamp(),
	               os.path.splitext(filename)[1])
	return fn


''' md5 check is two functions, below'''
def check_unique_file(id:int, f:str, fs_old_list:list)->bool or str:
	'''
		@:param 'id:int' this is a line number of the db for the NEW user file.
		 Below, will be search all the file wich has this name.
		  If been find (into the list files from the db), They be send for checking to \n
		 the function 'md5_chacker'

		@:param 'f:str' this's a name new file. This variable is a string type. \n
		Get the name file before save.

		@:param 'fs_old_list:list' This is whole list of the old files from the db

		@:returns 'True' if the file is unique. 'False' not unique
	'''
	result = []
	index_old_link:str or int = ''
	for view  in extension:
		'''get an extension of the new file'''
		if view in f:
			f_new_file_link = ''
			'''get link for a new user file from the db'''
			for row in fs_old_list:
				if int(row.id) == id:
					f_new_file_link = row.link
			'''создать фильтр групп'''
			for i in range(0, len(fs_old_list)):
				length_link = len(str(fs_old_list[i].link))
				'''check the file. If it has the extension 'view' that is True.
				If first check is a True  then second see/
				 '''
				if (view in str(fs_old_list[i].link)[length_link - 5:]):
					print('[check_unique_file]: file found with EXTENSION!', view)
					'''check all files exclude new user file'''
					# if ((f[-4] in str(fs_old_list[i].link)) and  (id != int(fs_old_list[i].id))):
					if ((view in f[-4:]) and (id != int(fs_old_list[i].id))):

						'''Here is check'''
						s_old_control_summ = md5_chacker(str(fs_old_list[i].link))
						s_new_control_summ = md5_chacker(str(f_new_file_link))
						if (str(s_new_control_summ) in str(s_old_control_summ) ):
							print('[check_unique_file]: File no is unique')
							result.append(False)
							index_old_link = i
							# return str(fs_old_list[i].link)
						else:
							print('[check_unique_file]: File is unique')
							result.append(True)
							# return True


	unique_result:list = list(set(result))
	if ((len(unique_result) > 1)
		or (((len(unique_result) == 1) and (unique_result[0] == False)))
	and type(index_old_link) != str):
		return str(fs_old_list[index_old_link].link)

	print('[check_unique_file]: END return unique')
	return True

def md5_chacker(link:str) -> str:
	# link = file_model.link
	''' check a file by the md5'''
	hasher = hashlib.md5()
	new_link = f'{MEDIA_ROOT}{link}'.replace("/", '\\')
	print('[CORRECTORS > new_link ]: ', new_link )
	with open(new_link, 'rb') as open_file:
		content = open_file.read()
		hasher.update(content)
		control_summ = hasher.hexdigest()
		print('[CORRECTORS > NOTE]: Ok!')
	return control_summ


