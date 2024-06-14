import json
from flask import jsonify, request

def get_object_detection_data():
    with open('app/data/object_detection_data.json') as f:
        data = json.load(f)
    return jsonify(data)

def get_trajectory_data():
    with open('app/data/trajectory_data.json') as f:
        data = json.load(f)
    return jsonify(data)

def get_filtered_object_detection_data():
    object_class = request.args.get('class')
    with open('app/data/object_detection_data.json') as f:
        data = json.load(f)
    
    if object_class:
        data = [item for item in data if any(obj['class'] == object_class for obj in item['objects'])]
    
    return jsonify(data)

def get_paginated_object_detection_data():
    page = int(request.args.get('page', 1))
    per_page = int(request.args.get('per_page', 10))

    with open('app/data/object_detection_data.json') as f:
        data = json.load(f)
    
    start = (page - 1) * per_page
    end = start + per_page

    paginated_data = data[start:end]

    return jsonify({
        'page': page,
        'per_page': per_page,
        'total': len(data),
        'data': paginated_data
    })

def get_filtered_trajectory_data():
    vehicle_id = request.args.get('vehicle_id')
    with open('app/data/trajectory_data.json') as f:
        data = json.load(f)
    
    if vehicle_id:
        data = [item for item in data if item['vehicle_id'] == vehicle_id]
    
    return jsonify(data)

def get_paginated_trajectory_data():
    page = int(request.args.get('page', 1))
    per_page = int(request.args.get('per_page', 10))

    with open('app/data/trajectory_data.json') as f:
        data = json.load(f)
    
    start = (page - 1) * per_page
    end = start + per_page

    paginated_data = data[start:end]

    return jsonify({
        'page': page,
        'per_page': per_page,
        'total': len(data),
        'data': paginated_data
    })