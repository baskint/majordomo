import RPi.GPIO as GPIO
import time

GPIO.setwarnings(False)
GPIO.setmode(GPIO.BOARD)


class MotionSensor:
    def __init__(self, sensor_pin, led_pin=None,
                 movement_min=5, read_delay=2.5):
        self.sensor_pin = sensor_pin
        self.led_pin = led_pin
        self.movement_min = movement_min
        self.read_delay = read_delay
        # Read output from PIR motion sensor
        GPIO.setup(self.sensor_pin, GPIO.IN)
        # LED output pin
        if(self.led_pin):
            GPIO.setup(self.led_pin, GPIO.OUT)

    def start(self, on_motion_detected):
        motion_count = 0
        while True:
            i = GPIO.input(self.sensor_pin)
            # When output from motion sensor is LOW
            if i == 0:
                if self.led_pin:
                    # Turn OFF LED
                    GPIO.output(self.led_pin, 0)

                motion_count = 0
            elif i == 1:
                if self.led_pin:
                    # Turn ON LED
                    GPIO.output(self.led_pin, 1)

                if motion_count == self.movement_min:
                    on_motion_detected(time.time())
                    motion_count = 0
                else:
                    motion_count += 1

            time.sleep(self.read_delay)

if __name__ == "__main__":
    sensor = MotionSensor(11, led_pin=12)
    sensor.start(on_motion_detected=lambda t: print(t))
