from flask_restful import Resource

from flask_restful import request
from flask_restful import reqparse
import json
from .swen_344_db_utils import *

class AllCourses(Resource):
    def get(self):
        result = exec_get_all("SELECT * FROM courses")
        return result
    
    def put(self, id):
        parser = reqparse.RequestParser()

        # parser.add_argument('dept_id', type=int)
        parser.add_argument('c_number', type=str)
        parser.add_argument('c_title', type=str)
        parser.add_argument('c_details', type=str)

        args = parser.parse_args()
        # did = args['dept_id']
        cnu = args['c_number']
        cti = args['c_title']
        cde = args['c_details']

        change_course = """
            UPDATE courses
            SET c_number = %s,
                c_title = %s,
                c_details = %s
            WHERE ID = %s;
        """

        result = exec_commit(change_course, [cnu,cti,cde, id])
        return result

    def delete(self, id):

        delete_bleat = """
            DELETE FROM courses WHERE ID=%s;
        """

        result = exec_commit(delete_bleat, [id])

        return result