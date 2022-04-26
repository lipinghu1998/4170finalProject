from flask import Flask
from flask import render_template
from flask import Response, request, jsonify
app = Flask(__name__)

#Variables to track score (Game)
score=0
total_score=10

#Variable to track hints (Game)
hints=3

#Variables to track steps completed (Learn)
steps_completed=0
total_steps=11

#Data in JSON
data={

"instructions": {
    "0":{
          "id": "0",
          "description": "Drag the correct material to the cutting board"
     },
    "1":{
          "id": "1",
          "description": "(1)<b> UNTHAW </b>the frozen steak",
          "sub": ["<b>Cut</b> your butter and garlic"]
    },
    "2":{
          "id": "2",
          "description": "(2) Put a pan over <b>Medium-High heat</b>"
       },
    "3":{
          "id": "3",
          "description": "(3) Drag the <b>salt</b> and <b>pepper</b> onto <br>the steak to season"
       },
    "4":{
          "id": "4",
          "description": "(4) <b>Rub</b> bottom of steaks with excess salt and pepper that has fallen onto table"
       },
    "5":{
          "id": "5",
          "description": "(5) Coat the pan in oil once the pan begins to <b>smoke</b>"
       },
    "6":{
          "id": "6",
          "description": "(6) <b>Sear</b> steak for one minute on each side"
       },
    "7":{
          "id": "7",
          "description": "(7) Drag the <b>thyme</b>, <b>garlic</b>, and <b>butter</b><br>onto the steak to season"
       },
    "8":{
          "id": "8",
          "description": "(8) Adjust the fire to <b>med-low</b>"
       },
    "9":{
           "id": "9",
           "description": "(9) <b>Baste</b> the steaks by <b>continuously scooping</b> melted butter on top of the steaks"
    },
    "10":{
        "id": "10",
        "description": "(10) <b>Remove</b> from heat and let <b>rest</b>"
    },
    "11":{
        "id": "11",
        "description": "(11) <b>Enjoy</b> the Gordon Ramsay Steak"
    }


},

"ingredients":{

  "garlic":{
      "cut" : {
         "id": "cut-garlic",
         "description": "Garlic",
         "image": "/static/images/cut-garlic.png"
      },
      "uncut":{
         "id": "uncut-garlic",
         "description": "Garlic",
         "image": "/static/images/uncut-garlic.png"

      }

   },

  "butter":{
      "cut" : {
         "id": "cut-butter",
         "description": "Butter",
         "image": "/static/images/cut-butter.png"
      },
      "uncut":{
         "id": "uncut-butter",
         "description": "Butter",
         "image": "/static/images/uncut-butter.png"

      }

   },

  "steak":{
      "frozen" : {
         "id": "frozen-steak",
         "description": "Steak",
         "image": "/static/images/frozen-steak.png"
      },
      "raw":{
         "id": "raw-steak",
         "description": "Steak",
         "image": "/static/images/raw-steak.png"

      },
      "cooked":{
         "id": "cooked-steak",
         "description": "Steak",
         "image": "/static/images/cooked-steak.png"

      },
      "seasoned":{
         "id": "seasoned-steak",
         "description": "Steak",
         "image": "/static/images/seasoned-steak.png"

      },
      "finished":{
         "id": "finished-steak",
         "description": "Steak",
         "image": "/static/images/finished-steak.png"

      },
      "banner":{
         "id": "banner-steak",
         "description": "Steak",
         "image": "/static/images/banner-steak.png"

      },
      "rubbing":{
         "id": "rubbing-steak-gif",
         "description": "Steak",
         "image": "/static/images/rubbing-steak-gif.gif"

      },
      "flipped":{
         "id": "flipped-seasoned-steak-gif",
         "description": "Steak",
         "image": "/static/images/flipped-seasoned-steak.png"

      },
      "option":{
         "id": "option-steak",
         "description": "Steak",
         "image": "/static/images/option-steak.png"

      }

   },

  "thyme":{
      "id": "thyme",
      "description": "Thyme",
      "image": "/static/images/thyme.png"

   },

  "salt":{
      "id": "salt",
      "description": "Salt",
      "image": "/static/images/salt.png"

   },

  "pepper":{
      "id": "pepper",
      "description": "Pepper",
      "image": "/static/images/pepper.png"

   },

  "olive-oil":{
      "id": "olive-oil",
      "description": "Olive Oil",
      "image": "/static/images/olive-oil.png"

   }

},

"incorrect":{

  "broccoli":{
    "id": "broccoli",
    "description": "Brocolli",
    "image": "/static/images/incorrect-broccoli.png"
   },

  "chicken":{
    "id": "chicken",
    "description": "Chicken",
    "image": "/static/images/incorrect-chicken.png"
      },

  "chili":{
    "id": "chili",
    "description": "Chili",
    "image": "/static/images/incorrect-chili.png"
   },

  "chili-powder":{
    "id": "chili-powder",
    "description": "Chili Powder",
    "image": "/static/images/incorrect-chili-powder.png"
   },

  "garlic-powder":{
    "id": "garlic-powder",
    "description": "Garlic Powder",
    "image": "/static/images/incorrect-garlic-powder.png"
   },

  "onion":{
    "id": "onion",
    "description": "Onion",
    "image": "/static/images/incorrect-onion.png"
      }


  },


"utensils":{

   "spoon":{
      "empty" : {
         "id": "spoon",
         "description": "Spoon",
         "image": "/static/images/spoon.png"
      },
      "oiled":{
         "id": "oiled-spoon",
         "description": "Spoon",
         "image": "/static/images/oiled-spoon.png"

      }

   },
   "pan":{
      "empty" : {
         "id": "empty-pan",
         "description": "Pan",
         "image": "/static/images/empty-pan.png"
      },
      "oiled":{
         "id": "oiled-pan",
         "description": "Pan",
         "image": "/static/images/oiled-pan.png"

      },
      "filled":{
         "id": "filled-pan",
         "description": "Pan",
         "image": "/static/images/filled-pan.png"

      }

   },
   "knife":{
      "id": "knife",
      "description": "Knife",
      "image": "/static/images/knife.png"
  },
   "cutting-board":{
      "id": "cutting-board",
      "description": "Cutting Board",
      "image": "/static/images/cutting-board.png"
  }


},

"actions":{

  "fire":{
      "id": "fire",
      "description": "Fire",
      "image": "/static/images/fire.gif"
  },
  "smoke":{
      "id": "smoke",
      "description": "Smoke",
      "image": "/static/images/smoke.gif"
  },
  "season":{
      "id": "season-texture",
      "description": "Season Texture",
      "image": "/static/images/season-texture.png"
  },
  "arrow":{

           "label" : {
              "id": "arrow-label",
              "description": "Arrow Label",
              "image": "/static/images/arrow-label.png"
           },
           "next":{
              "id": "arrow-next",
              "description": "Arrow Next",
              "image": "/static/images/arrow-next.png"
           }
        },
  "cross":{
    "id": "cross",
    "description": "Cross",
    "image": "/static/images/cross.png"
}


   },

 "chefs":{

 "ramsay":{
       "id": "ramsay",
       "description": "Gordon Ramsay",
       "image": "/static/images/ramsay.png"
   }
 }

}

#Data for a specific step
ingredients_step=[]
utensils_step=[]
actions_step=[]

#Data to Client
ingredients=[]
utensils=[]
actions=[]


#ROUTES
@app.route('/')
def home():
   return render_template('home.html', steak=data["ingredients"]["steak"], stat={"steps_completed":steps_completed, "total_steps":total_steps})

@app.route('/learn/<step>')
def learn_step(step=None):

    #Steps
    if step=="1":
        ingredients_step=["garlic", "butter", "steak", "thyme", "salt", "pepper", "olive-oil"]
        utensils_step=["pan", "knife", "cutting-board"]
        actions_step=["arrow"]
    elif step=="2":
        ingredients_step=["garlic", "butter", "steak", "thyme", "salt", "pepper", "olive-oil"]
        utensils_step=["pan", "knife", "cutting-board"]
        actions_step=["arrow", "fire"]
    elif step=="3":
        ingredients_step=["garlic", "butter", "steak", "thyme", "salt", "pepper", "olive-oil"]
        utensils_step=["pan", "knife", "cutting-board"]
        actions_step=["arrow", "fire", "season"]
    elif step=="4":
        ingredients_step=["garlic", "butter", "steak", "thyme", "salt", "pepper", "olive-oil"]
        utensils_step=["pan", "knife", "cutting-board"]
        actions_step=["arrow", "fire", "season"]
    elif step == "5":
        ingredients_step=["garlic", "butter", "steak", "thyme", "salt", "pepper", "olive-oil"]
        utensils_step=["pan", "knife", "cutting-board"]
        actions_step=["fire","smoke","arrow"]
    elif step == "6":
        ingredients_step=["garlic", "butter", "steak", "thyme", "salt", "pepper", "olive-oil"]
        utensils_step=["pan", "knife", "cutting-board"]
        actions_step=["fire","smoke","arrow"]
    elif step == "7":
        ingredients_step=["garlic", "butter", "steak", "thyme", "salt", "pepper", "olive-oil"]
        utensils_step=["pan", "knife", "cutting-board"]
        actions_step=["fire","smoke","arrow"]
    elif step == "8":
        ingredients_step=["garlic", "butter", "steak", "thyme", "salt", "pepper", "olive-oil"]
        utensils_step=["pan", "knife", "cutting-board"]
        actions_step=["fire","smoke", "arrow"]
    elif step == "9":
        ingredients_step=["garlic", "butter", "steak", "thyme", "salt", "pepper", "olive-oil"]
        utensils_step=["pan", "knife", "cutting-board","spoon"]
        actions_step=["arrow","fire"]
    elif step == "10":
       ingredients_step=["garlic", "butter", "steak", "thyme", "salt", "pepper", "olive-oil"]
       utensils_step=["pan", "knife", "cutting-board"]
       actions_step=["fire","arrow"]
    elif step == "11":
       ingredients_step=["garlic", "butter", "steak", "thyme", "salt", "pepper", "olive-oil"]
       utensils_step=["pan", "knife", "cutting-board"]
       actions_step=["fire","arrow"]

    ingredients={x:data["ingredients"][x] for x in ingredients_step}
    utensils={x:data["utensils"][x] for x in utensils_step}
    actions={x:data["actions"][x] for x in actions_step}


    return render_template('learn_'+str(step)+'.html', ingredients=ingredients, utensils=utensils, actions=actions, instruction=data["instructions"][step])



@app.route('/game')
def game():
   return render_template('game.html', img=data["chefs"])



@app.route('/game/<step>')
def game_step(step=None):

    #Steps
    if step=="0":
        ingredients_step=["garlic", "butter", "steak", "thyme", "salt", "pepper", "olive-oil"]
        utensils_step=["cutting-board"]
        actions_step=["arrow", "cross"]
    elif step=="1":
        ingredients_step=["garlic", "butter", "steak", "thyme", "salt", "pepper", "olive-oil"]
        utensils_step=["pan", "knife", "cutting-board"]
        actions_step=["arrow"]
    elif step=="2":
        ingredients_step=["garlic", "butter", "steak", "thyme", "salt", "pepper", "olive-oil"]
        utensils_step=["pan", "knife", "cutting-board"]
        actions_step=["arrow", "fire"]
    elif step=="3":
        ingredients_step=["garlic", "butter", "steak", "thyme", "salt", "pepper", "olive-oil"]
        utensils_step=["pan", "knife", "cutting-board"]
        actions_step=["arrow", "fire", "season"]
    elif step=="4":
        ingredients_step=["garlic", "butter", "steak", "thyme", "salt", "pepper", "olive-oil"]
        utensils_step=["pan", "knife", "cutting-board"]
        actions_step=["arrow", "fire", "season"]
    elif step == "5":
        ingredients_step=["garlic", "butter", "steak", "thyme", "salt", "pepper", "olive-oil"]
        utensils_step=["pan", "knife", "cutting-board"]
        actions_step=["fire","smoke","arrow"]
    elif step == "6":
        ingredients_step=["garlic", "butter", "steak", "thyme", "salt", "pepper", "olive-oil"]
        utensils_step=["pan", "knife", "cutting-board"]
        actions_step=["fire","smoke","arrow"]
    elif step == "7":
        ingredients_step=["garlic", "butter", "steak", "thyme", "salt", "pepper", "olive-oil"]
        utensils_step=["pan", "knife", "cutting-board"]
        actions_step=["fire","smoke", "arrow"]
    elif step == "8":
        ingredients_step=["garlic", "butter", "steak", "thyme", "salt", "pepper", "olive-oil"]
        utensils_step=["pan", "knife", "cutting-board"]
        actions_step=["fire","smoke", "arrow"]
    elif step == "9":
        ingredients_step=["garlic", "butter", "steak", "thyme", "salt", "pepper", "olive-oil"]
        utensils_step=["pan", "knife", "cutting-board","spoon"]
        actions_step=["arrow","fire"]
    elif step == "10":
       ingredients_step=["garlic", "butter", "steak", "thyme", "salt", "pepper", "olive-oil"]
       utensils_step=["pan", "knife", "cutting-board"]
       actions_step=["fire","arrow"]
    elif step == "11":
       ingredients_step=["garlic", "butter", "steak", "thyme", "salt", "pepper", "olive-oil"]
       utensils_step=["pan", "knife", "cutting-board"]
       actions_step=["fire","arrow"]


    ingredients={x:data["ingredients"][x] for x in ingredients_step}
    utensils={x:data["utensils"][x] for x in utensils_step}
    actions={x:data["actions"][x] for x in actions_step}

    if step=="0":
        return render_template('game_'+str(step)+'.html', ingredients=ingredients, utensils=utensils, actions=actions, instruction=data["instructions"][step], stat={"hints":hints}, incorrect=data["incorrect"])
    else:
        return render_template('game_'+str(step)+'.html', ingredients=ingredients, utensils=utensils, actions=actions, instruction=data["instructions"][step], stat={"hints":hints})

@app.route('/result')
def result():

   return render_template('result.html', stat={"score":score, "total_score":total_score}, steak=data["ingredients"]["steak"], cutting_board=data["utensils"]["cutting-board"])



# AJAX FUNCTIONS
@app.route('/increase_score', methods=['GET', 'POST'])
def increase_score():
    global score

    response=request.get_json()

    if response["check"]=="success":
        score+=1

    return jsonify(score = score)


@app.route('/decrease_hints', methods=['GET', 'POST'])
def decrease_hints():
    global hints

    response=request.get_json()

    if response["check"]=="success":
        hints-=1

    return jsonify(hints = hints)



@app.route('/increase_steps_completed', methods=['GET', 'POST'])
def increase_steps_completed():
    global steps_completed

    response=request.get_json()

    if response["check"]=="success":
        steps_completed+=1

    return jsonify(steps_completed = steps_completed)





@app.route('/reset_score', methods=['GET', 'POST'])
def reset_score():
    global score

    response=request.get_json()

    if response["check"]=="success":
        score=0

    return jsonify(score = score)


@app.route('/reset_hints', methods=['GET', 'POST'])
def reset_hints():
    global hints

    response=request.get_json()

    if response["check"]=="success":
        hints=3

    return jsonify(hints = hints)


@app.route('/reset_steps_completed', methods=['GET', 'POST'])
def reset_steps_completed():
    global steps_completed

    response=request.get_json()

    if response["check"]=="success":
        steps_completed=0

    return jsonify(steps_completed = steps_completed)





@app.route('/return_steps_completed', methods=['GET', 'POST'])
def return_steps_completed():
    global steps_completed

    response=request.get_json()

    return jsonify(steps_completed = steps_completed)






if __name__ == '__main__':
   app.run(debug = True)
