class Car {
 #brand;
  #model;
  speed;
  isTrunkOpen;

  constructor(brand, model, speed=0, isTrunkOpen = false){
    this.#brand = brand;
    this.#model = model;
    this.speed = speed;
    this.isTrunkOpen = isTrunkOpen;
  }

  displayInfo(){
    console.log(`${this.#brand}`, `${this.#model}`, `${this.speed} Km/hr`, `${this.isTrunkOpen}`);

  }

  go(){
    if(this.speed <200 && !this.isTrunkOpen === true){
      this.speed +=5;
      this.acceleration +=300;
    }
  }

  brake(){
   if(this.speed>0){
    this.speed -=5;
   }
  }

  openTrunk(){
    if(this.speed === 0){
      this.isTrunkOpen = true;
    }
    }

    closeTrunk(){
      this.isTrunkOpen = false;
    }
  }

export let car = new Car('Toyota', 'corolla');

export let car1 = new Car('Tesla','Model 3');

car.go();
car.displayInfo();

car.openTrunk();
car.displayInfo();

car.closeTrunk();
car.go();
car.displayInfo();



class RaceCar extends Car{
  acceleration;

  
constructor(brand, model, speed, acceleration){
  super(brand, model, speed)
    this.acceleration = acceleration;
  }
  
   displayInfo(){
    console.log(`${this.brand}`, `${this.model}`, `${this.speed} Km/hr`,);

  }

  go(){
    if(this.speed < 300){
      this.speed += this.
      acceleration;
    }
}

openTrunk(){
}

    closeTrunk(){
}
}

export let raceCar =  new RaceCar('McLaren','F1',0,20);


raceCar.go();
raceCar.displayInfo();

raceCar.openTrunk();
raceCar.closeTrunk();
