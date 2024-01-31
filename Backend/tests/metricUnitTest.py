from metric.metricHandler import *
import pytest


def test_nonexistent_guess():
    with pytest.raises(Exception):
        num_2_paths("asdfasdf", "Dog")

def test_nonexistent_target():
    with pytest.raises(Exception):
        num_2_paths("Dog", "asdfasdf")

def test_none_guess():
    with pytest.raises(Exception):
        num_2_paths(None, "Dog")

def test_none_target():
    with pytest.raises(Exception):
        num_2_paths("Dog", None)

def test_zero_paths_1():
    assert num_2_paths("Dog", "Eigenvalue") == 0
    assert num_2_paths("Eigenvalue", "Dog") == 0

def test_zero_paths_2():
    assert num_2_paths("Chopin", "Ganymede (moon)") == 0
    assert num_2_paths("Ganymede (moon)", "Chopin") == 0

def test_has_path_1():
    assert num_2_paths("Belgium", "subregion") >= 1

def test_has_path_2():
    assert num_2_paths("chipotle", "Thomas Jefferson") >= 1

def test_return_to_self_1():
    assert num_2_paths("Dog", "Dog") >= 1

def test_return_to_self_2():
    assert num_2_paths("salmon", "salmon") >= 1