from handler import Handler
from metric.metricHandler import num_2_paths
from utilities.responseBuilders import errorBuild


class DistanceHandler(Handler):

    def handle(self, args:dict):
        article = args["article"]
        guess = args["guess"]
        try:
            return {"result":"success", "distance": self.yourFunc(article,guess)}
        except Exception as e:
            return errorBuild(e.args[0])

    def yourFunc(self,article,guess):
        def distanceFunc(article,guess):
            return num_2_paths(article,guess)
        return distanceFunc(article,guess)