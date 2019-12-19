

function Laser() {
    this.show = function () {
        push();
        translate(width / 2, height / 2);
        stroke("red");

        function march(point, objects) {

            let distances = [];
            for (let obj of objects) {
                distances.push(dist(obj.pos.x, obj.pos.y, point.x, point.y) - obj.r);
            }

            let closestDistance = min(...distances);

            return [ closestDistance, objects[distances.indexOf(closestDistance)] ];
        }

        let ray = player.pos.copy();
        let distance = 0;
        let tDistance = 0;
        let asteroidClosest;

        strokeWeight(0);
        fill(200, 100, 255, 100)


        push();
        translate(-player.pos.x, -player.pos.y);

        do {

            [distance, asteroidClosest] = march(ray, asteroids);

            change = p5.Vector.fromAngle(radians(player.facing));
            change.setMag(distance);

            ray.add(change);

            tDistance += distance;
            
        } while (distance > 1 && tDistance < width);
        pop();

        if (tDistance < player.laserLimit) {
            player.inventory[asteroidClosest.type]+=0.05;

            if(asteroidClosest.r > 30){
                asteroidClosest.r -= 1;
            } else{
                asteroids.pop(asteroidClosest)
            }
        }  

        stroke('red');
        strokeWeight(5);

        laserPoint = p5.Vector.fromAngle(radians(player.facing));
        laserPoint.setMag(min(tDistance, player.laserLimit));

        line(0, 0, laserPoint.x, laserPoint.y);
        pop();
    }
}