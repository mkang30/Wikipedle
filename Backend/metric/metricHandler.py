import wikipediaapi

def num_shared_links(article1, article2):
    wiki = wikipediaapi.Wikipedia()
    page1 = wiki.page(article1)
    page2 = wiki.page(article2)
    links1 = page1.links
    links2 = page2.links
    articlelinks1 = {k:v for k,v in links1.items() if v.namespace == 0}
    articlelinks2 = {k:v for k,v in links2.items() if v.namespace == 0}
    I = set(articlelinks1.keys()).intersection(set(articlelinks2.keys()))
    return len(I)

def all_shared_links(article1, article2):
    if not isinstance(article1, str):
        raise Exception("article1 must be a string")
    if not isinstance(article2, str):
        raise Exception("article2 must be a string")
    wiki = wikipediaapi.Wikipedia()
    page1 = wiki.page(article1)
    page2 = wiki.page(article2)
    if not page1.exists():
        raise Exception("article1 does not exist")
    if not page2.exists():
        raise Exception("article2 does not exist")
    links1 = set(page1.links.values())
    links2 = set(page2.links.values())
    return links1.union(links2)

def num_2_paths(guess, target):
    if not isinstance(guess, str):
        print("1")
        raise Exception("Guess must be a string")
    if not isinstance(target, str):
        print("2")
        raise Exception("Target must be a string")
    
    wiki = wikipediaapi.Wikipedia()
    page1 = wiki.page(guess)
    page2 = wiki.page(target)
    if not page1.exists():
        raise Exception("Guess article does not exist")
    if not page2.exists():
        raise Exception("Target article does not exist")
    links1 = page1.links
    links2 = page2.backlinks
    articlelinks1 = {k:v for k,v in links1.items() if v.namespace == 0}
    articlelinks2 = {k:v for k,v in links2.items() if v.namespace == 0}
    I = set(articlelinks1.keys()).intersection(set(articlelinks2.keys()))
    return len(I)

# def num_edges_between_shared_links(article1, article2):
#     E = 0
#     all_shared = all_shared_links(article1, article2)
#     print(len(all_shared))
#     for (i,L) in enumerate(all_shared):
#         print(i)
#         for l in L.links.values():
#             if l in all_shared:
#                 E += 1
#     return E

if __name__ == "__main__":
    wiki = wikipediaapi.Wikipedia()
    # page1 = wiki.page("Dog")
    # page2 = wiki.page("Eigenvector")
    # links1 = page1.links
    # links2 = page2.links
    # articlelinks1 = {k:v for k,v in links1.items() if v.namespace == 0}
    # articlelinks2 = {k:v for k,v in links2.items() if v.namespace == 0}
    # I = set(articlelinks1.keys()).intersection(set(articlelinks2.keys()))
    # print(list(I))
    # print(len(I))
    print(num_2_paths("salmon", "salmon"))