from flask import Blueprint
from app.controllers.data_controller import get_object_detection_data, get_trajectory_data, get_filtered_object_detection_data, get_paginated_object_detection_data, get_filtered_trajectory_data, get_paginated_trajectory_data

data_bp = Blueprint('data', __name__)

@data_bp.route('/api/object-detection', methods=['GET'])
def object_detection_route():
    return get_object_detection_data()

@data_bp.route('/api/trajectory', methods=['GET'])
def trajectory_route():
    return get_trajectory_data()

@data_bp.route('/api/object-detection/filter', methods=['GET'])
def filtered_object_detection_route():
    return get_filtered_object_detection_data()

@data_bp.route('/api/object-detection/paginate', methods=['GET'])
def paginated_object_detection_route():
    return get_paginated_object_detection_data()

@data_bp.route('/api/trajectory/filter', methods=['GET'])
def filtered_trajectory_route():
    return get_filtered_trajectory_data()

@data_bp.route('/api/trajectory/paginate', methods=['GET'])
def paginated_trajectory_route():
    return get_paginated_trajectory_data()