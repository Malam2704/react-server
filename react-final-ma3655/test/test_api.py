import unittest
import json
from rest_utils import *

class TestExample(unittest.TestCase):
    def test_api(self):
        result = get_rest_call(self, 'http://localhost:5000/example_api')
        self.assertEqual(9, result[0],"Should have returned a count of '9'")
        print("API test successfully returned a count of '9' ")

    # def test_question_08_SarahZ_adds_a_bleat(self):
    #     print()
    #     expectedPrevious = [
    #         [
    #             {
    #                 "id": 4,
    #                 "user_id": 1,
    #                 "bleat_content": "sometimes weirdos put whoopee cushions on the seats."
    #             }
    #         ],
    #         [
    #             {
    #                 "id": 5,
    #                 "user_id": 1,
    #                 "bleat_content": "grillby, we'll have a double order of burg."
    #             }
    #         ],
    #         [
    #             {
    #                 "id": 15,
    #                 "user_id": 1,
    #                 "bleat_content": "CONGRATULATIONS!"
    #             }
    #         ]
    #     ]
    #     expectedPresent = [
    #         [
    #             {
    #                 "id": 4,
    #                 "user_id": 1,
    #                 "bleat_content": "sometimes weirdos put whoopee cushions on the seats."
    #             }
    #         ],
    #         [
    #             {
    #                 "id": 5,
    #                 "user_id": 1,
    #                 "bleat_content": "grillby, we'll have a double order of burg."
    #             }
    #         ],
    #         [
    #             {
    #                 "id": 15,
    #                 "user_id": 1,
    #                 "bleat_content": "CONGRATULATIONS!"
    #             }
    #         ],
    #         [
    #             {
    #                 "id": 16,
    #                 "user_id": 1,
    #                 "bleat_content": "No burg is complete without cheese"
    #             }
    #         ]
    #     ]

    #     _id = "1"
    #     _bleat_content = "No burg is complete without cheese"

    #     data = dict(_id=f'{_id}', bleat_content=f'{_bleat_content}')
    #     post_rest_call(self, 'http://localhost:5000/courses', data)
    #     actualPresent = get_rest_call(
    #         self, "http://localhost:5000/courses/11")

    #     print("Q8. Have SarahZ post a new bleat: “No burg is complete without cheese” (Print out: “Question 8: Adding SarahZ bleat")
    #     print("   Adding SarahZ bleat")
    #     print("   ", actualPresent[len(actualPresent)-1])

    #     self.assertEqual(expectedPresent, actualPresent)