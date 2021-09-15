
ifndef mablung-makefile-environment-path
export mablung-makefile-environment-path := $(shell npx mablung-makefile-environment get-path)
endif

include $(mablung-makefile-environment-path)

ifndef current-build-folder

pre-build::
	$(info - pre-build --------------------------------------)
	$(if $(verbose),@echo update .... .eslintrc.json and babel.config.json)
	@npx mablung-makefile-environment update-configuration

endif