import numpy as np
import pandas as pd
import json
import sys


anime      = pd.read_csv("./model/anime.csv")
distances  = np.load('./model/distances.npy')
indices    = np.load('./model/indices.npy')
arg        = sys.argv[1]


def get_index_from_name(name):
    return anime[anime["name"]==name].index.tolist()[0]

all_anime_names = list(anime.name.values)

def get_id_from_partial_name(partial):
    result = {}
    i = 0
    for name in all_anime_names:
        if partial in name:
            # print(name,all_anime_names.index(name))
            result[i] = (name,all_anime_names.index(name))
            i+=1

    return result

""" print_similar_query can search for similar animes both by id and by name. """

def print_similar_animes(query=None,id=None):
    result = []
    if id:
        for id in indices[id][1:]:
            result.append(anime.iloc[id]["name"])
    if query:
        found_id = get_index_from_name(query)
        for id in indices[found_id][1:]:
            result.append(anime.iloc[id]["name"])

    return result



if __name__ == "__main__":


    query = get_id_from_partial_name(arg.lower())
    result = print_similar_animes(id=query[0][1])

    print(json.dumps(result))