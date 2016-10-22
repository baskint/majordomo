from subprocess import call
from motion.motion_sensor import MotionSensor


def upload_picture(t):
    print('Uploading image at {}'.format(t))
    call(['./get_image.sh'])


s = MotionSensor(11, movement_min=0)
s.start(on_motion_detected=lambda t: upload_picture(t))
