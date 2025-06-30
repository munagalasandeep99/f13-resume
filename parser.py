import os

# Specify the directory path here
directory = "C:\\Users\\SAMPATH REDDY\\OneDrive\\Desktop\\test"  # Replace with your directory path
directory_name = os.path.basename(os.path.normpath(directory))
output_file_name = "output.txt"

def print_directory_structure(root_dir, prefix="", output_list=None):
    if output_list is None:
        output_list = []
    
    # Get all entries in the directory
    entries = sorted(os.listdir(root_dir))
    for index, entry in enumerate(entries):
        full_path = os.path.join(root_dir, entry)
        # Skip node_modules
        if entry == "node_modules":
            continue
        # Determine the prefix for the current entry
        is_last = index == len(entries) - 1
        current_prefix = prefix + ("└───" if is_last else "├───")
        if os.path.isdir(full_path):
            output_list.append(f"{prefix}{current_prefix}{entry}")
            # Recursively process subdirectory
            next_prefix = prefix + ("    " if is_last else "│   ")
            print_directory_structure(full_path, next_prefix, output_list)
        else:
            # Skip .gitignore and package_lock.json in directory structure
            if entry not in [".gitignore", "package_lock.json"]:
                output_list.append(f"{prefix}{current_prefix}{entry}")
    
    return output_list

with open(output_file_name, 'w', encoding='utf-8') as output_file:
    # Write directory structure
    output_file.write(f"{directory_name}:.\n")
    dir_structure = print_directory_structure(directory)
    for line in dir_structure:
        output_file.write(line + '\n')
    output_file.write('\n\n')  # Two blank lines after directory structure

    # Write file paths and contents
    for root, dirs, files in os.walk(directory):
        # Skip node_modules directory
        if 'node_modules' in dirs:
            dirs.remove('node_modules')
        
        for file in files:
            # Skip .gitignore and package_lock.json
            if file in ['.gitignore', 'package-lock.json']:
                continue
                
            full_path = os.path.join(root, file)
            relative_path = os.path.relpath(full_path, directory).replace(os.sep, '/')
            output_path = directory_name + '/' + relative_path
            try:
                with open(full_path, 'r', encoding='utf-8') as f:
                    content = f.read()
                output_file.write(output_path + '\n')
                output_file.write(content)
                if not content.endswith('\n'):
                    output_file.write('\n')
                output_file.write('\n\n\n')  # Add three blank lines after each file
            except Exception as e:
                print(f"Error reading {full_path}: {e}")