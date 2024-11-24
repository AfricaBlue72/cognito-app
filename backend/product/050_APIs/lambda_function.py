import json
from datetime import datetime

def handler(event, context):
    return {
        'statusCode': 200,
        'body': json.dumps({
            'message': 'Hello from the API!',
            'timestamp': datetime.now().isoformat(),
            'data': {
                'id': '123',
                'name': 'Test Data',
                'value': 42
            }
        })
    }
