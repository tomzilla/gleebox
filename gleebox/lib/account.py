from gleebox.models import User

def create(email, password):
    return User.create(email, password)

def get(id):
    return User.get(id)
