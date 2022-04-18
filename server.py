from flask import Flask
from flask import render_template
from flask import Response, request, jsonify
app = Flask(__name__)


#Variables to keep track of state & score
score=0
total=1

#Ingredients for a step
ingredients_step=[]
utensils_step=[]
actions_step=[]

#Data to Client
ingredients=[]
utensils=[]
actions=[]

#Data in JSON
data={

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
  }

},

 "chef":{

    "ramsay":{
       "id": "ramsay",
       "description": "Gordon Ramsay",
       "image": "/static/images/ramsay.png"
   }
 }

}








#ROUTES
@app.route('/')
def home():
   return render_template('home.html')

@app.route('/learn/<step>')
def learn_step(step=None):
   #Steps
   if step=="1":
      ingredients_step=["garlic", "butter", "steak", "thyme", "salt", "pepper", "olive-oil"]
      utensils_step=["pan", "knife", "cutting-board"]
      actions_step=["arrow"]
   elif step == "5":
      ingredients_step=["garlic", "butter", "steak", "thyme", "salt", "pepper", "olive-oil"]
      utensils_step=["pan", "knife", "cutting-board"]
      actions_step=["fire","smoke","arrow"]

      
   ingredients={x:data["ingredients"][x] for x in ingredients_step}
   utensils={x:data["utensils"][x] for x in utensils_step}
   actions={x:data["actions"][x] for x in actions_step}


   return render_template('learn_'+str(step)+'.html', ingredients=ingredients, utensils=utensils, actions=actions)



@app.route('/game')
def game():
   return render_template('game.html', img={"chef":data["chef"]})





@app.route('/game/<step>')
def game_step(step=None):

    #Steps
    if step=="1":
        ingredients_step=["garlic", "butter", "steak", "thyme", "salt", "pepper", "olive-oil"]
        utensils_step=["pan", "knife", "cutting-board"]
        actions_step=["arrow"]



    ingredients={x:data["ingredients"][x] for x in ingredients_step}
    utensils={x:data["utensils"][x] for x in utensils_step}
    actions={x:data["actions"][x] for x in actions_step}


    return render_template('game_'+str(step)+'.html', ingredients=ingredients, utensils=utensils, actions=actions)

@app.route('/result')
def result():
   return render_template('result.html', stat={"score":score, "total":total})



# AJAX FUNCTIONS
@app.route('/increase_score', methods=['GET', 'POST'])
def increase_score():
    global score

    response=request.get_json()

    if response["check"]=="success":
        score+=1

    return jsonify(score = score)




if __name__ == '__main__':
   app.run(debug = True)
